import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import type { ViewProps } from 'react-native';
import { Pressable } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AccordionContext = createContext({
  isOpen: false,
  accordionIsOpen: () => {},
});

// type AccordionProvider = ContextType<typeof AccordionContext>;
type AnimatedComponentProps = PropsWithChildren<AnimatedProps<ViewProps>>;

// Internal Hook
const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordion must be used within a Accordion.Provider');
  }

  return context;
};

function Provider({
  children,
  isOpen: initialIsOpen,
  onChange,
  style,
  ...rest
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onChange?: (value: boolean) => void;
} & AnimatedProps<ViewProps>) {
  const [isOpen, accordionIsOpen] = useState(!!initialIsOpen);
  return (
    <AccordionContext.Provider
      value={{
        isOpen,
        accordionIsOpen: () => {
          onChange?.(!isOpen);
          accordionIsOpen((prev) => {
            return !prev;
          });
        },
      }}
    >
      <Animated.View
        style={[style, { overflow: 'hidden' }]}
        layout={LinearTransition.springify().damping(80).stiffness(200)}
        {...rest}
      >
        {children}
      </Animated.View>
    </AccordionContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { accordionIsOpen } = useAccordion();

  return (
    <AnimatedPressable onPress={() => accordionIsOpen()}>
      {children}
    </AnimatedPressable>
  );
}

function Icon({
  children,
  rotation = 'clockwise',
}: {
  children: React.ReactNode;
  rotation?: 'clockwise' | 'counter-clockwise';
}) {
  const { isOpen } = useAccordion();
  const rotate = useDerivedValue(() => {
    return withSpring(isOpen ? (rotation === 'clockwise' ? -1 : 1) * 180 : 0, {
      damping: 80,
      stiffness: 200,
    });
  }, [isOpen, rotation]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={stylez}
      layout={LinearTransition.springify().damping(80).stiffness(200)}
    >
      {children}
    </Animated.View>
  );
}

function Expanded({ children, ...rest }: AnimatedComponentProps) {
  const { isOpen } = useAccordion();

  if (!isOpen) {
    return;
  }

  return <Content {...rest}>{children}</Content>;
}

function Collapsed({ children, ...rest }: AnimatedComponentProps) {
  const { isOpen } = useAccordion();

  if (isOpen) {
    return;
  }

  return <Content {...rest}>{children}</Content>;
}
function Always({ children, ...rest }: AnimatedComponentProps) {
  return <Content {...rest}>{children}</Content>;
}

function Content({ children, style, ...rest }: AnimatedComponentProps) {
  return (
    <Animated.View
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
      layout={LinearTransition.springify().damping(80).stiffness(200)}
      style={[style, { overflow: 'hidden' }]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}

function Sibling({ children, ...rest }: AnimatedComponentProps) {
  return (
    <Animated.View
      layout={LinearTransition.springify().damping(80).stiffness(200)}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}

export const Accordion = {
  /**
   * The main component that will handle the state of the accordion.
   *
   * @param isOpen boolean
   * @param onChange (value: boolean) => void
   */
  Accordion: Provider,
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
  HeaderIcon: Icon,
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

export default Accordion;
