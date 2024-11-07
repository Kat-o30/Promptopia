"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [promptId, setPromptId] = useState(null);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Extract promptId from the URL when the component is mounted
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    setPromptId(id);

    if (id) {
      const getPromptDetails = async () => {
        try {
          const response = await fetch(`/api/prompt/${id}`);

          if (!response.ok) throw new Error("Network response was not ok");

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

      getPromptDetails();
    }
  }, []);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update prompt:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePrompt = async () => {
    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to delete prompt:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
      <button onClick={deletePrompt}>Delete</button>
    </Suspense>
  );
};

export default UpdatePrompt;
