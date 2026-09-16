import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../scss/styles.scss';

$(function () {
  // инициализация popover 
  $('[data-bs-toggle="popover"]').each(function () {
    new bootstrap.Popover(this);
  });

  // тост при нажатии на "загрузить"
  const toast = new bootstrap.Toast($('#liveToast')[0]);

  $('.btn-load').on('click', function () {
    $('#toastYear').text($(this).data('year'));
    toast.show();
  });

  // переключение модальных окон стрелками 
  const modals = $('.modal');
  let openedModal = null;

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
    // после последнего окна - первое
    const nextModal = modals[(index + step + modals.length) % modals.length];

    // следующее окно открываем, когда текущее  закроется
    openedModal.addEventListener('hidden.bs.modal', () => {
      bootstrap.Modal.getOrCreateInstance(nextModal).show();
    }, { once: true });

    bootstrap.Modal.getOrCreateInstance(openedModal).hide();
  });
});
