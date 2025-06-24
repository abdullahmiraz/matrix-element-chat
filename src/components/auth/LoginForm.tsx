"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginWithPassword } from "@/lib/matrixClient";

interface LoginFormProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({
  onLoginSuccess,
  onSwitchToRegister,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const homeserverUrl =
        process.env.NEXT_PUBLIC_MATRIX_HOMESERVER_URL || "https://matrix.org";
      await loginWithPassword({
        homeserverUrl,
        username,
        password,
      });
      onLoginSuccess();
    } catch (err: unknown) {
      let message = "Login failed";
      function hasMessage(e: unknown): e is { message: string } {
        return (
          typeof e === "object" &&
          e !== null &&
          "message" in e &&
          typeof (e as { message: unknown }).message === "string"
        );
      }
      if (hasMessage(err)) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Welcome to Matrix Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            placeholder="Username (e.g. @user:matrix.org)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={onSwitchToRegister}
            className="text-sm"
          >
            Don't have an account? Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
