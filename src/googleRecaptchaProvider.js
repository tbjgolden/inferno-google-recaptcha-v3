import { Component } from 'inferno';
import createInfernoContext from './createInfernoContext';

const GoogleReCaptchaContext = createInfernoContext({});
const GoogleReCaptchaConsumer = GoogleReCaptchaContext.Consumer;
export { GoogleReCaptchaConsumer, GoogleReCaptchaContext };

export class GoogleReCaptchaProvider extends Component {
  grecaptcha = new Promise((resolve, reject) => {
    this.resolver = resolve;
    this.rejecter = reject;
  });

  componentDidMount() {
    this.injectGoogleReCaptchaScript();
  }

  get value() {
    const { executeRecaptcha } = this;
    return { executeRecaptcha };
  }

  executeRecaptcha = async action => {
    const { reCaptchaKey } = this.props;

    return this.grecaptcha.then(grecaptcha =>
      grecaptcha.execute(reCaptchaKey, { action })
    );
  };

  handleOnLoad = () => {
    if (!window || !window.grecaptcha) {
      console.warn('Google ReCaptcha is not available');
      return;
    }

    window.grecaptcha.ready(() => {
      this.resolver(window.grecaptcha);
    });
  };

  injectGoogleReCaptchaScript = () => {
    if (window.injectedGoogleReCaptchaScript) return;

    window.injectedGoogleReCaptchaScript = true;
    const { reCaptchaKey } = this.props;
    const head = document.getElementsByTagName('head')[0];
    const js = document.createElement('script');
    js.src = `https://www.google.com/recaptcha/api.js?render=${reCaptchaKey}`;
    js.onload = this.handleOnLoad;
    head.appendChild(js);
  };

  render() {
    const { children } = this.props;

    return (
      <GoogleReCaptchaContext.Provider value={this.value}>
        {children}
      </GoogleReCaptchaContext.Provider>
    );
  }
}
