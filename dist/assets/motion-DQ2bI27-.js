function t(a){return{animationDuration:a,animationFillMode:"both"}}function p(a,i,r,n,$=!1){const e=$?"&":"";return{[`
      ${e}${a}-enter,
      ${e}${a}-appear
    `]:{...t(n),animationPlayState:"paused"},[`${e}${a}-leave`]:{...t(n),animationPlayState:"paused"},[`
      ${e}${a}-enter${a}-enter-active,
      ${e}${a}-appear${a}-appear-active
    `]:{animationName:i,animationPlayState:"running"},[`${e}${a}-leave${a}-leave-active`]:{animationName:r,animationPlayState:"running",pointerEvents:"none"}}}export{p as t};
