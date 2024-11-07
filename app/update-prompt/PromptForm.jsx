"use client";

import { useEffect } from "react";

const PromptForm = ({ promptId, post, setPost }) => {
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Failed to fetch prompt details:", error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId, setPost]);

  return null;
};

export default PromptForm;
