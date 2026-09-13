import * as bootstrap from 'bootstrap';
import '../scss/styles.scss';

document.addEventListener('DOMContentLoaded', function () {
  // Инициализация всех Popover на странице
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach(popoverTriggerEl => {
    new bootstrap.Popover(popoverTriggerEl);
  });

  // Инициализация Toast
  const toastElList = document.querySelectorAll('.toast');
  toastElList.forEach(toastEl => {
    new bootstrap.Toast(toastEl);
  });
});