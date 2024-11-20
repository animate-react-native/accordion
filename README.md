<div align="center">
<h1>React Native Accordion</h1>

https://github.com/user-attachments/assets/3906847e-c609-4f85-b5e5-b2bb68cef901

[![NPM Version](https://img.shields.io/npm/v/@animatereactnative/accordion.svg?style=flat&color=black)](https://www.npmjs.org/package/@animatereactnative/accordion) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/) [![npm](https://img.shields.io/npm/l/@animatereactnative/accordion?style=flat-square)](https://www.npmjs.com/package/@animatereactnative/accordion) [![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/@animatereactnative/accordion) <a href="https://twitter.com/mironcatalin"><img src="https://img.shields.io/twitter/follow/mironcatalin?label=Follow @mironcatalin&color=black" alt="Follow Miron Catalin"></a>

</div>

React Native Accordion component, a cross-platform accordion component, powered by Reanimated, that's capable of displaying dynamic height content and animate the layout changes/transitions between Collapsable and Expandable states.

If you are going to use this component along with other components (as siblings), it is recommended to use `Accordion.Sibling` and wrap the Siblings with it. This is because the exposed `Sibling` component will use Layout animations as well so there are no layout shifts or sudden movements, keeping everything smooth.

- 🔋 Powered by Reanimated
- 📱 Works with Expo
- ✅ Cross-platform (iOS, Android, Web - wip)
- ⚡️ 60-120fps
- 🪝 Works with any React Native element/component
- 🎼 Composition ready
- ⌨️ Written in TypeScript

## Installation

```sh
npm install @animatereactnative/accordion
```

> Also, you need to install [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), and follow their installation instructions.

## Usage

```js
import { Accordion } from '@animatereactnative/accordion';

// ...

export function Example() {
  return (
    <Accordion.Accordion>
      <Accordion.Header>
        <Text>AnimateReactNative.com</Text>
        <Accordion.HeaderIcon>
          <ChevronUp />
        </Accordion.HeaderIcon>
      </Accordion.Header>

      <Accordion.Collapsed>
        <Text>Visible !expanded</Text>
      </Accordion.Collapsed>
      <Accordion.Always>
        <Text>Always visible</Text>
      </Accordion.Always>

      <Accordion.Expanded>
        <Text>Expanded content</Text>
        {loading && <ActivityIndicator />}
        {data & <MyList data={data} />}
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
```

## Props

```
Accordion = {
  /**
   * The main component that will handle the state of the accordion.
   *
   * @param isOpen boolean
   * @param onChange (value: boolean) => void
   */
  Accordion
  /**
   * The header of the accordion.
   */
  Header,
  /**
   * The component that will wrap any children and it will apply a rotation to it.
   *
   * @param children
   * @param rotation clockwise | counter-clockwise
   */
  HeaderIcon
  /**
   * This is the content that will be displayed when the accordion is open
   */
  Expanded,
  /**
   * This is the content that will be displayed when the accordion is closed
   */
  Collapsed,
  /**
   * This is the content that will always be displayed
   */
  Always,
  /**
   *
   * This is a component that will add the layout transition to any
   * sibling components. Useful when you are rendering other components
   * that are not direct children of the Accordion component.
   */
  Sibling,
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](./LICENSE)

---

<p align="center">
  <a href="https://www.animatereactnative.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://www.animatereactnative.com/animatereactnative_dark.svg">
      <img alt="AnimateReactNative.com - Premium and Custom React Native animations." src="https://www.animatereactnative.com/animatereactnative_logo.svg" width="50%">
    </picture>
  </a>
</p>
