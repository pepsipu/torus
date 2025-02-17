import app from "app";

export default {
  scheduled(event: ScheduledEvent, env, ctx: ExecutionContext) {
    const delayedProcessing = async () => {
      console.log("mewo!");
    };
    ctx.waitUntil(delayedProcessing());
  },

  fetch(request: Request, env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx);
  },
};
