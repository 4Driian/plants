const acordionInit = () => {
  const headers = document.querySelectorAll('.more-info-stock-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
      const content = header.nextElementSibling;
      content.classList.toggle('active');

      headers.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
    });
  });
};

export default acordionInit;
