document.addEventListener('DOMContentLoaded', () => {
  const stacks = document.querySelectorAll('.scroll-stack-scroller');
  if (!stacks.length) return;

  stacks.forEach(scroller => {
    new ScrollStack(scroller).init();
  });
});

class ScrollStack {
  constructor(scroller) {
    this.scroller = scroller;
    this.cards = [];
    this.endElement = null;
    this.lastTransforms = new Map();
    this.isUpdating = false;
    this.ticking = false;

    this.itemDistance = this.getNumber('itemDistance', 90);
    this.itemScale = this.getNumber('itemScale', 0.03);
    this.itemStackDistance = this.getNumber('itemStackDistance', 30);
    this.stackPosition = this.getString('stackPosition', '20%');
    this.scaleEndPosition = this.getString('scaleEndPosition', '10%');
    this.baseScale = this.getNumber('baseScale', 0.88);
    this.rotationAmount = this.getNumber('rotationAmount', 0);
    this.blurAmount = this.getNumber('blurAmount', 0);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  init() {
    this.cards = Array.from(this.scroller.querySelectorAll('.scroll-stack-card'));
    this.endElement = this.scroller.querySelector('.scroll-stack-end');

    if (!this.cards.length) return;

    this.cards.forEach((card, index) => {
      if (index < this.cards.length - 1) {
        card.style.marginBottom = `${this.itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    this.scroller.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize);

    this.update();
  }

  getNumber(name, fallback) {
    const value = this.scroller.dataset[name];
    if (value === undefined) return fallback;
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  getString(name, fallback) {
    const value = this.scroller.dataset[name];
    return value !== undefined ? value : fallback;
  }

  handleScroll() {
    this.requestTick();
  }

  handleResize() {
    this.requestTick();
  }

  requestTick() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  parsePercentage(value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }

  calculateProgress(scrollTop, start, end) {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }

  getElementOffset(element) {
    return element.offsetTop;
  }

  update() {
    if (!this.cards.length || this.isUpdating) return;

    this.isUpdating = true;

    const scrollTop = this.scroller.scrollTop;
    const containerHeight = this.scroller.clientHeight;
    const stackPositionPx = this.parsePercentage(this.stackPosition, containerHeight);
    const scaleEndPositionPx = this.parsePercentage(this.scaleEndPosition, containerHeight);
    const endElementTop = this.endElement ? this.getElementOffset(this.endElement) : this.scroller.scrollHeight;

    this.cards.forEach((card, index) => {
      const cardTop = this.getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - this.itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - this.itemStackDistance * index;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = this.baseScale + index * this.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = this.rotationAmount ? index * this.rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (this.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < this.cards.length; j++) {
          const jCardTop = this.getElementOffset(this.cards[j]);
          const jTriggerStart = jCardTop - stackPositionPx - this.itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (index < topCardIndex) {
          const depthInStack = topCardIndex - index;
          blur = Math.max(0, depthInStack * this.blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + this.itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + this.itemStackDistance * index;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = this.lastTransforms.get(index);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        this.lastTransforms.set(index, newTransform);
      }
    });

    this.isUpdating = false;
  }
}
