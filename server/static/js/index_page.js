require(
['facebook', 'ext/jquery', 'util', 'sign_in', 'ext/cookie'],
function(_facebook, $, _util, _sign_in, __) {
  $('.header-bg').css('opacity', 1.0);
  $('.sign-up-box').addClass('animated');

  var next = _util.getQueryParam('next');
  var nextUrl;
  if (next) {
    nextUrl = '/profile?next=' + next;
  }
  _facebook.initConnectButton({
    source: 'HOME',
    nextUrl: nextUrl
  });

  var referrerId = _util.getReferrerId();
  if (referrerId) {
    mixpanel.track('Visit Referral Link', { referrerId: referrerId });
    $.cookie('referrer_id', referrerId, { expires: 30, path: '/' });
  } else {
    $.removeCookie('referrer_id');
  }

  _sign_in.renderEmailSignInModal();

  $('.email-link').click(function() {
    mixpanel.track('Sign in with email intent');
  });

  mixpanel.track('Impression: Landing page');

  $(document.body).trigger('pageScriptComplete');
});
