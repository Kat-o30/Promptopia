// File: /api/prompt/[id]/route.js
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    // Delete the prompt by ID
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
