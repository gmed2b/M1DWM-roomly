from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.cloud_monitoring import CloudMonitoringMetricsExporter
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from prometheus_client import Counter, Histogram, generate_latest
from flask import request
import time

# Prometheus metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint']
)

def setup_monitoring(app):
    # Setup OpenTelemetry
    tracer_provider = TracerProvider()
    gcp_monitoring_exporter = CloudMonitoringMetricsExporter()
    tracer_provider.add_span_processor(
        BatchSpanProcessor(gcp_monitoring_exporter)
    )
    trace.set_tracer_provider(tracer_provider)
    
    # Instrument Flask
    FlaskInstrumentor().instrument_app(app)
    
    # Add Prometheus metrics middleware
    @app.before_request
    def before_request():
        request.start_time = time.time()

    @app.after_request
    def after_request(response):
        request_latency = time.time() - request.start_time
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.path,
            status=response.status_code
        ).inc()
        REQUEST_LATENCY.labels(
            method=request.method,
            endpoint=request.path
        ).observe(request_latency)
        return response

    # Add metrics endpoint
    @app.route('/metrics')
    def metrics():
        return generate_latest() 