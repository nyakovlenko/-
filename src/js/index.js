import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../scss/styles.scss';

$(function () {
  // Инициализация всех Popover на странице
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });

  // Toast при нажатии на кнопку "Загрузить"
  const toast = new bootstrap.Toast($('#liveToast')[0]);

  $('.btn-load').on('click', function () {
    $('#toastYear').text($(this).data('year'));
    toast.show();
  });

  // Переключение модальных окон стрелками влево / вправо
  const modals = $('.modal');
  let openedModal = null; // окно, которое сейчас полностью открыто

  modals.each(function () {
    this.addEventListener('shown.bs.modal', () => {
      openedModal = this;
    });
    this.addEventListener('hide.bs.modal', () => {
      openedModal = null;
    });
  });

  $(document).on('keydown', function (event) {
    if (!openedModal) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    const step = event.key === 'ArrowRight' ? 1 : -1;
    const index = modals.index(openedModal);
    // по кругу: после последнего окна снова первое
    const nextModal = modals[(index + step + modals.length) % modals.length];

    // следующее окно открываем, когда текущее полностью закроется
    openedModal.addEventListener('hidden.bs.modal', () => {
      bootstrap.Modal.getOrCreateInstance(nextModal).show();
    }, { once: true });

    bootstrap.Modal.getOrCreateInstance(openedModal).hide();
  });
});
