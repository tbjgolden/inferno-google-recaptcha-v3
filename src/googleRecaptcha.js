import { Component } from 'inferno';
import { withGoogleReCaptcha } from './withGoogleRecaptcha';

class GoogleReCaptcha extends Component {
  async componentDidMount() {
    const {
      googleReCaptchaProps: { executeRecaptcha },
      action,
      onVerify
    } = this.injectedProps;

    if (!executeRecaptcha) return;
    if (!onVerify) return;

    const token = await executeRecaptcha(action);
    onVerify(token);
  }

  get injectedProps() {
    return this.props;
  }

  render() {
    return null;
  }
}

const _GoogleRecaptcha = withGoogleReCaptcha(GoogleReCaptcha);

export { _GoogleRecaptcha as GoogleReCaptcha };
