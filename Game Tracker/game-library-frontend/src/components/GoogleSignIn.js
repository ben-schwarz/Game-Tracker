import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleSignIn({ onSuccess, onFailure }) {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccess(credentialResponse.credential);
        }}
        onError={() => onFailure("Google Sign-In failed")}
      />
    </GoogleOAuthProvider>
  );
}
