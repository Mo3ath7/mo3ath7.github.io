
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://mo3ath7.github.io",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: corsHeaders }
      );
    }

    try {
      const { message } = await request.json();

      if (typeof message !== "string" || !message.trim()) {
        return Response.json(
          { error: "Please enter a message." },
          { status: 400, headers: corsHeaders }
        );
      }

      return Response.json(
        { reply: "وصلني سؤالك! M03 AI جاهز للربط بالذكاء الاصطناعي الحقيقي 🚀" },
        { headers: corsHeaders }
      );
    } catch {
      return Response.json(
        { error: "Invalid request." },
        { status: 400, headers: corsHeaders }
      );
    }
  },
};
