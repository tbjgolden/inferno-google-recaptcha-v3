import { Component } from 'inferno';
import { GoogleReCaptchaConsumer } from './googleRecaptchaProvider';

export const withGoogleReCaptcha = WrappedComponent => {
  const { displayName, name } = WrappedComponent;

  class WithGoogleReCaptchaComponent extends Component {
    displayName = `withGoogleReCaptcha(${displayName || name || 'Component'})`;
    wrappedComponent = WrappedComponent;

    render() {
      return (
        <GoogleReCaptchaConsumer>
          {googleReCaptchaValues => (
            <WrappedComponent
              {...this.props}
              googleReCaptchaProps={googleReCaptchaValues}
            />
          )}
        </GoogleReCaptchaConsumer>
      );
    }
  }

  return WithGoogleReCaptchaComponent;
};
