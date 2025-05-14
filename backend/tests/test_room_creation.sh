#!/bin/bash
# test_api.sh - Script de test pour l'API Roomly

# Variables pour les couleurs dans le terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL de base de l'API
BASE_URL="http://127.0.0.1:5000/api"

echo -e "${BLUE}=== Test de l'API Roomly ===${NC}\n"

# Fonction pour afficher les résultats
display_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✓ Succès${NC}"
  else
    echo -e "${RED}✗ Échec${NC}"
  fi
  echo ""
}

# 1. Test d'inscription
echo -e "${BLUE}1. Test d'inscription utilisateur${NC}"
REGISTER_RESPONSE=$(curl -s -w "%{http_code}" -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "motdepasse123",
    "first_name": "John",
    "last_name": "Doe"
  }')

HTTP_CODE=${REGISTER_RESPONSE: -3}
CONTENT=${REGISTER_RESPONSE:0:${#REGISTER_RESPONSE}-3}

echo "Code HTTP: $HTTP_CODE"
echo "Réponse: $CONTENT"
display_result $([ $HTTP_CODE -eq 201 ] || [ $HTTP_CODE -eq 400 ] && echo 0 || echo 1)

# 2. Test de connexion
echo -e "${BLUE}2. Test de connexion${NC}"
LOGIN_RESPONSE=$(curl -s -w "%{http_code}" -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "motdepasse123"
  }')

HTTP_CODE=${LOGIN_RESPONSE: -3}
CONTENT=${LOGIN_RESPONSE:0:${#LOGIN_RESPONSE}-3}

echo "Code HTTP: $HTTP_CODE"
echo "Réponse: $CONTENT"
display_result $([ $HTTP_CODE -eq 200 ] && echo 0 || echo 1)

# Extraction du token JWT
TOKEN=$(echo $CONTENT | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token JWT: $TOKEN"

# 3. Test de récupération des salles
echo -e "${BLUE}3. Test de récupération des salles${NC}"
ROOMS_RESPONSE=$(curl -s -w "%{http_code}" -X GET $BASE_URL/rooms)

HTTP_CODE=${ROOMS_RESPONSE: -3}
CONTENT=${ROOMS_RESPONSE:0:${#ROOMS_RESPONSE}-3}

echo "Code HTTP: $HTTP_CODE"
echo "Nombre de salles: $(echo $CONTENT | grep -o '\[.*\]' | tr -cd '[' | wc -c)"
display_result $([ $HTTP_CODE -eq 200 ] && echo 0 || echo 1)

# 4. Création d'une salle (si vous avez le token)
if [ ! -z "$TOKEN" ]; then
  echo -e "${BLUE}4. Test de création d'une salle${NC}"
  
  # Afficher la requête pour le débogage
  echo "Envoi de la requête POST à $BASE_URL/rooms"
  
  # Utilisez les valeurs correctes qui correspondent à votre schéma
  ROOM_CREATE_RESPONSE=$(curl -s -w "%{http_code}" -X POST $BASE_URL/rooms \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Salle de test",
      "slug": "salle-test",
      "description": "Description test",
      "shortDescription": "Description courte",
      "category": "Standard",
      "type": "Moyenne",
      "capacity": {
        "min": 5,
        "max": 20,
        "optimal": 10
      },
      "size": 30,
      "pricePerHour": 50,
      "pricePerDay": 300,
      "location": {
        "address": "123 rue de Test",
        "city": "Ville Test",
        "postalCode": "75000",
        "country": "France",
        "coordinates": {
          "lat": 48.8566,
          "lng": 2.3522
        }
      },
      "amenities": [],
      "services": [],
      "images": [],
      "availabilityConfirmationRequired": false,
      "rating": 4.5,
      "reviews": 0
    }')

  HTTP_CODE=${ROOM_CREATE_RESPONSE: -3}
  CONTENT=${ROOM_CREATE_RESPONSE:0:${#ROOM_CREATE_RESPONSE}-3}

  echo "Code HTTP: $HTTP_CODE"
  echo "Réponse: $CONTENT"
  display_result $([ $HTTP_CODE -eq 201 ] && echo 0 || echo 1)

  # Extraction de l'ID de la salle
  ROOM_ID=$(echo $CONTENT | grep -o '"id":[0-9]*' | cut -d':' -f2)
  
  # 5. Test de création d'une réservation
  if [ ! -z "$ROOM_ID" ]; then
    echo -e "${BLUE}5. Test de création d'une réservation${NC}"
    BOOKING_CREATE_RESPONSE=$(curl -s -w "%{http_code}" -X POST $BASE_URL/bookings \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "{
        \"room_id\": $ROOM_ID,
        \"user_id\": 1,
        \"date\": \"2025-06-01\",
        \"is_full_day\": false,
        \"start_time\": \"09:00:00\",
        \"end_time\": \"12:00:00\",
        \"attendees\": 10,
        \"services\": [],
        \"total_price\": 150
      }")

    HTTP_CODE=${BOOKING_CREATE_RESPONSE: -3}
    CONTENT=${BOOKING_CREATE_RESPONSE:0:${#BOOKING_CREATE_RESPONSE}-3}

    echo "Code HTTP: $HTTP_CODE"
    echo "Réponse: $CONTENT"
    display_result $([ $HTTP_CODE -eq 201 ] && echo 0 || echo 1)
  fi
  
  # 6. Test de récupération des réservations d'un utilisateur
  echo -e "${BLUE}6. Test de récupération des réservations d'un utilisateur${NC}"
  USER_BOOKINGS_RESPONSE=$(curl -s -w "%{http_code}" -X GET $BASE_URL/bookings/user/1 \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=${USER_BOOKINGS_RESPONSE: -3}
  CONTENT=${USER_BOOKINGS_RESPONSE:0:${#USER_BOOKINGS_RESPONSE}-3}

  echo "Code HTTP: $HTTP_CODE"
  echo "Réponse: $CONTENT"
  display_result $([ $HTTP_CODE -eq 200 ] && echo 0 || echo 1)
fi

echo -e "${BLUE}Tests terminés${NC}"