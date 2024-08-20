import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getLinkToken = async () => {
      console.log("PlaidLink ", user)
      const data = await createLinkToken(user);
      console.log("link token Created", data?.linkToken);
      setToken(data?.linkToken);
    };
    console.log("Got Link Token", token);
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      console.log("pushing to /")
      router.push("/");
    },
    [router, user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button onClick={() => open()} disabled={!ready}>
          Connect bank
        </Button>
      ) : (
        <Button onClick={() => open()} disabled={!ready}>
          Connect bank
        </Button>
      )}
    </>
  );
};

export default PlaidLink;