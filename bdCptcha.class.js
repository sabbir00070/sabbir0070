class bdCaptcha {
  constructor() {
    this.container = null;
    this.secretKey = null;
    this.bd = [
  "https://samiulalim1.github.io/swpCaptcha/images/1.png",
	"https://samiulalim1.github.io/swpCaptcha/images/2.png",
	"https://samiulalim1.github.io/swpCaptcha/images/3.png",
	"https://samiulalim1.github.io/swpCaptcha/images/4.png",
	"https://samiulalim1.github.io/swpCaptcha/images/5.png",
	"https://samiulalim1.github.io/swpCaptcha/images/6.png",
	"https://samiulalim1.github.io/swpCaptcha/images/7.png",
	"https://samiulalim1.github.io/swpCaptcha/images/8.png",
	"https://samiulalim1.github.io/swpCaptcha/images/9.png",
	"https://samiulalim1.github.io/swpCaptcha/images/10.png",
	"https://samiulalim1.github.io/swpCaptcha/images/11.png",
	"https://samiulalim1.github.io/swpCaptcha/images/12.png",
	"https://samiulalim1.github.io/swpCaptcha/images/13.png",
      ];
    this.unbd = [
        	"https://samiulalim1.github.io/swpCaptcha/images/1.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/2.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/3.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/4.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/5.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/6.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/7.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/8.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/9.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/10.jpg",
      ];
  }
  setCaptcha(id) {
    this.loadTailwind(() => {
    this.container = document.getElementById(id);
    if(!this.container) {
      console.error("bdCaptcha: container not found ? target set id please add now");
      return;
    }
    this.addHTML();
    this.check = document.getElementById('check');
    this.spin = document.getElementById('spin');
    this.captchaBox = document.getElementById('captchaBox');
    this.captchaOverlay = document.getElementById('captchaOverlay');
    this.gridOverlay = document.getElementById('gridOverlay');
    this.verify = document.getElementById('verify');
    this.verified = localStorage.getItem('captchaVerified');
    this.selectedIndexs = [];
    this.captchaData = [];
    this.bindEvent();
    });
  }
  setCaptchaSecret(key) {
    if(!key || typeof key !== 'string') {
      console.warn("bdCaptcha: Invalid secretkey!");
      return;
    }
    this.secretKey = key;
  }
 addHTML() {
    this.html = `
     <div class="relative w-full max-w-[360px] bg-white border border-gray-200 rounded-xl shadow-md">
    <div
      id="captchaBox"
      class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition select-none"
    >
      <div class="w-5 h-5 flex items-center justify-center shrink-0">
        <span id="check" class="w-4 h-4 border border-gray-400 rounded-sm flex justify-center items-center p-1"></span>
        <span id="spin" class="hidden w-4 h-4 rounded-full border-2 border-dashed border-gray-300 border-t-indigo-600 animate-spin"></span>
      </div>

      <div class="flex-1 leading-tight">
        <p class="text-sm font-medium text-gray-800">
          Verify you are human
        </p>
        <p class="text-[11px] text-gray-400">
          Security check by bdCaptcha
        </p>
      </div>

      <div class="flex flex-col items-center gap-0.5">
        <img src="flag.png" class="w-7 h-7 rounded-full ring-1 ring-gray-200" />
        <span class="text-[9px] text-gray-500 font-medium">
          bdCaptcha
        </span>
      </div>
    </div>

    <!-- Overlay -->
    <div
      id="captchaOverlay"
      class="hidden absolute inset-0 z-10 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl"
    >
      <div class="w-full max-w-[300px] bg-white rounded-xl border shadow-lg p-4">

        <div class="mb-3">
          <p class="text-sm text-gray-800">
            Select all images with
            <span class="font-semibold text-green-700">Bangladesh</span>
          </p>
        </div>

        <div
          id="gridOverlay"
          class="grid grid-cols-4 gap-2 mb-4"
        ></div>

        <button
          id="verify"
          class="w-full py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition"
        >
          Verify
        </button>

        <p
          id="captchaError"
          class="hidden mt-2 text-center text-[11px] text-red-600"
        >
          Verification failed. Please try again.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-4 py-2 border-t text-[10px] text-gray-500">
      <span>Protected by bdCaptcha</span>
      <div class="flex items-center gap-1">
        <a href="#" class="hover:underline">Privacy</a>
        <span>·</span>
        <a href="#" class="hover:underline">Terms</a>
      </div>
    </div>

  </div>`;
      this.container.innerHTML = this.html;
      this.container.className = "w-full flex items-center justify-center";
  }
  bindEvent() {
  
  this.check.addEventListener('click', () => {
    this.StartLoading();
  });
  this.verify.addEventListener('click', () => {
    if(this.checkCaptcha()) {
      this.token = this.generateCaptchaToken();
      if(this.token) {
          localStorage.setItem("captchaVerified", 'true');
          localStorage.setItem("captchaToken", this.token);
          this.verified = 'true';
          this.CloseCaptcha();
          this.StartLoading();
          this.RenderVerified();
          console.log("bdCaptcha solved.");
      } else {
        this.StartLoading();
        console.error(`bdCaptcha: token is not generate`)
      }
    } else {
      this.renderCaptcha();
      console.log(`bdCptcha: error in verify captcha.`)
    }
  });
  
  
  }
  StartLoading() {
    this.check.classList.add('hidden');
    this.spin.classList.remove('hidden');
    if(this.secretKey === '' || this.secretKey === null) {
      alert("bdCaptcha: please add secret api key.");
      console.error(`bdCaptcha: please add secret api key.`)
      return;
    }
    setTimeout(() => {
      this.StopLoading();
      if(this.verified === 'true') {
        this.RenderVerified();
        return;
      }
      this.OpenCaptcha();
      this.renderCaptcha();
    }, 1800)
  }
  StopLoading() {
    this.check.classList.remove('hidden');
    this.spin.classList.add('hidden');
  }
  RenderVerified() {
    this.check.innerHTML = `<span class="text-green-600 text-lg font-bold">✓</span>`;
  }
  OpenCaptcha() {
    this.captchaOverlay.classList.remove('hidden');
  }
  CloseCaptcha() {
    this.captchaOverlay.classList.add('hidden');
  }
  ShuffleArray(arr) {
    let copy = [...arr];
    for (let i = copy.length -1; i > 0; i--) {
      let c = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[c]] = [ copy[c], copy[i] ];
    }
    return copy;
  }
  generateCaptchaData() {
    this.bdSelect = this.ShuffleArray(this.bd).slice(0, 3).map(src => ({
      src,
      correct: true
    }));
    this.unbdSelect = this.ShuffleArray(this.unbd).slice(0, 9).map(src => ({
      src,
      correct: false
    }));
    this.combine = this.ShuffleArray([...this.bdSelect, ...this.unbdSelect]);
    return this.combine;
  }
  renderCaptcha() {
    this.gridOverlay.innerHTML = '';
    this.selectedIndexs = [];
    this.captchaData = this.generateCaptchaData();
    this.captchaData.forEach((item, index) => {
      const img = document.createElement("img");
      img.src = item.src;
      img.className = "w-16 h-16 rounded-md border cursor-pointer hover:ring-2 hover:ring-indigo-500 transition";
      img.addEventListener('click', () => {
        img.classList.toggle("ring-2");
        img.classList.toggle("ring-indigo-600");
        if(this.selectedIndexs.includes(index)) {
          this.selectedIndexs = this.selectedIndexs.filter(i => i !== index);
        } else {
          this.selectedIndexs.push(index);
        }
      });
      this.gridOverlay.appendChild(img);
      
    })
  }
  checkCaptcha() {
    return this.captchaData.every((item, index) => item.correct === this.selectedIndexs.includes(index));
  }
  generateCaptchaToken() {
    if(!this.secretKey) return null;
    const payload = {
      time: Date.now(),
      rand: Math.random().toString(36).slice(2),
    };
    const raw = JSON.stringify(payload) + this.secretKey;
    return btoa(raw);
  }
  getToken() {
    const a = localStorage.getItem('captchaToken');
    if(!a) {
      localStorage.clear();
      return;
    }
    return localStorage.getItem('captchaToken');
  }
loadTailwind(callback) {
  if (window.tailwind) {
    callback?.();
    return;
  }

  if (document.getElementById("bd-captcha-tailwind")) {
    const wait = setInterval(() => {
      if (window.tailwind) {
        clearInterval(wait);
        callback?.();
      }
    }, 30);
    return;
  }

  const script = document.createElement("script");
  script.id = "bd-captcha-tailwind";
  script.src = "https://cdn.tailwindcss.com";
  script.onload = () => callback?.();
  document.head.appendChild(script);
}
}