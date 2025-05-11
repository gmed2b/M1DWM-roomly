"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LucideBuilding, LucideCheck, LucideEye, LucideEyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Vérifier si le token est présent
    if (!token) {
      setTokenValid(false);
      setError("Lien de réinitialisation invalide ou expiré");
      return;
    }

    // Dans une implémentation réelle, vous vérifieriez la validité du token auprès de votre API
    const verifyToken = async () => {
      try {
        // Simulation de vérification du token
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Si le token est invalide ou expiré
        // Décommentez ces lignes pour simuler un token invalide
        /*
        setTokenValid(false);
        setError("Lien de réinitialisation invalide ou expiré");
        */
      } catch (err) {
        setTokenValid(false);
        setError("Une erreur est survenue lors de la vérification du lien");
        console.error(err);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation de base
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);

    try {
      // Pour le moment, c'est juste une simulation de réinitialisation
      // Dans un environnement réel, vous appelleriez votre API ici
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Afficher le message de succès
      setIsSuccess(true);

      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 3000);
    } catch (err) {
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full p-4 bg-green-50">
                <LucideCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Mot de passe réinitialisé</h2>
              <p className="text-sm text-gray-700">
                Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
              Aller à la page de connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <LucideBuilding className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Réinitialiser votre mot de passe</CardTitle>
          <CardDescription>
            {tokenValid
              ? "Veuillez choisir un nouveau mot de passe pour votre compte"
              : "Il y a un problème avec votre lien de réinitialisation"}
          </CardDescription>
        </CardHeader>

        {tokenValid ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mb-6">
              {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <LucideEyeOff className="h-4 w-4" /> : <LucideEye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Min. 8 caractères, incluant une majuscule et un chiffre</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmer le nouveau mot de passe
                </label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-primary hover:underline">
                  Retour à la connexion
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
            <p className="text-sm text-gray-700">
              Votre lien de réinitialisation de mot de passe est invalide ou a expiré. Veuillez demander un nouveau lien
              pour réinitialiser votre mot de passe.
            </p>
            <Button className="w-full" onClick={() => router.push("/forgot-password")}>
              Demander un nouveau lien
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
