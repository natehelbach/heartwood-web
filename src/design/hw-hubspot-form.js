// <hw-hubspot-form portal="…" form="…" region="na3">fallback markup</hw-hubspot-form>
// Ported verbatim from the design's ui_kits/website/hw-hubspot-form.js. Loads a HubSpot form
// embed; the fallback children hide once HubSpot's iframe appears, and come back only if the
// embed never sizes itself (e.g. HubSpot blocked).
(function () {
  if (customElements.get('hw-hubspot-form')) return;
  var loaded = {};
  function loadScript(region, portal) {
    var src = 'https://js-' + region + '.hsforms.net/forms/embed/' + portal + '.js';
    if (loaded[src]) return;
    loaded[src] = true;
    var s = document.createElement('script'); s.src = src; s.defer = true; document.head.appendChild(s);
  }
  class HWHubspotForm extends HTMLElement {
    connectedCallback() {
      this.style.display = 'block';
      var portal = this.getAttribute('portal'), form = this.getAttribute('form'), region = this.getAttribute('region') || 'na1';
      if (!portal || !form || this._frame) return;
      var f = document.createElement('div');
      f.className = 'hs-form-frame';
      f.setAttribute('data-region', region); f.setAttribute('data-form-id', form); f.setAttribute('data-portal-id', portal);
      f.style.minHeight = (this.getAttribute('min-height') || '320') + 'px';
      this._frame = f; this.prepend(f);
      var self = this;
      function fallback(show) { Array.prototype.forEach.call(self.children, function (c) { if (c !== f) c.style.display = show ? '' : 'none'; }); }
      this._mo = new MutationObserver(function () { if (f.querySelector('iframe, form')) { fallback(false); self._mo.disconnect(); } });
      this._mo.observe(f, { childList: true, subtree: true });
      this._timer = setTimeout(function () { if (!f.querySelector('iframe, form')) { f.style.minHeight = '0'; fallback(true); } }, 20000);
      loadScript(region, portal);
      if (window.hbspt && window.hbspt.forms && window.HubSpotFormsV4 && window.HubSpotFormsV4.reload) { try { window.HubSpotFormsV4.reload(); } catch (e) {} }
    }
    disconnectedCallback() { this._mo && this._mo.disconnect(); clearTimeout(this._timer); }
  }
  customElements.define('hw-hubspot-form', HWHubspotForm);
})();
