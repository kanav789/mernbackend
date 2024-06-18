function Savetofile() {
  const text = document.getElementById("textarea").value;

  fetch("/save", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: text }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.downloadLink) {
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = data.downloadLink;
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download File";
      }
    });
}
