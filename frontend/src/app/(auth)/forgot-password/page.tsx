"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LucideArrowLeft, LucideBuilding, LucideMail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Pour le moment, c'est juste une simulation d'envoi d'email
      // Dans un environnement réel, vous appelleriez votre API ici
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Indiquer que l'email a été envoyé
      setEmailSent(true);
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de l'email");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <LucideBuilding className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Mot de passe oublié</CardTitle>
          <CardDescription>
            {!emailSent
              ? "Entrez votre adresse email pour recevoir un lien de réinitialisation"
              : "Veuillez consulter votre boîte mail pour réinitialiser votre mot de passe"}
          </CardDescription>
        </CardHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mb-6">
              {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center">
                  <LucideArrowLeft className="h-3 w-3 mr-1" />
                  Retour à la connexion
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6 mb-6">
            <div className="flex justify-center">
              <div className="rounded-full p-4 bg-green-50">
                <LucideMail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-700">
                Si un compte est associé à l&apos;adresse <span className="font-medium">{email}</span>, vous recevrez un
                email avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <p className="text-sm text-gray-700">
                Vérifiez également votre dossier de spam si vous ne voyez pas l&apos;email.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
            >
              Envoyer à une autre adresse
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-primary hover:underline">
                Retour à la page de connexion
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
