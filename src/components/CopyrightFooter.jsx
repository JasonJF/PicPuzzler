import React from "react";

function CopyrightFooter() {
  const d = new Date();
  let year = d.getFullYear();
  return <p>Copyright © {year} Jason JF</p>;
}

export default CopyrightFooter;
