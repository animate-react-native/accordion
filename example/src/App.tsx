import { Accordion } from '@animatereactnative/accordion';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ChevronUp } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const queryClient = new QueryClient();
const _spacing = 20;

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const usage = `<Accordion.Accordion>

  <Accordion.Header>
    <Text>Accordion header</Text>
    <Accordion.HeaderIcon>
      <ChevronUp />
    </Accordion.HeaderIcon>
  </Accordion.Header>

  <Accordion.Collapsed>
    <Text>Visible !expanded</Text>
  </Accordion.Collapsed>

  <Accordion.Expanded>
    <Text>Collapsed content</Text>
    {loading && <ActivityIndicator />}
    {data & <MyList data={data}/>}
  </Accordion.Expanded>

</Accordion.Accordion>`;

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function AccordionExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
          <StatusBar hidden />
          <View style={{ gap: _spacing / 2, paddingHorizontal: _spacing }}>
            <DummyAccordionWithData type="<Accordion /> component" />
            <DummyAccordionWithData type="Done with Reanimated" />
            <DummyAccordionWithData type="AnimateReactNative.com" />
            <Accordion.Sibling
              style={{
                padding: _spacing,
                backgroundColor: '#3332',
                borderRadius: _spacing,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  opacity: 0.6,
                  fontSize: 12,
                  fontFamily: 'Menlo',
                }}
              >
                {usage}
              </Text>
              <Image
                source={{
                  uri: 'https://github.com/animate-react-native/.github/blob/main/animatereactnative.com-dark.png?raw=true',
                }}
                style={{
                  width: '70%',
                  height: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </Accordion.Sibling>
          </View>
        </ScrollView>
      </View>
    </QueryClientProvider>
  );
}

function DummyAccordionWithData({ type = 'default' }) {
  const [isActive, setIsActive] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['dummydata', isActive, type],
    enabled: isActive,
    queryFn: async () => {
      const data = (await fetch(
        `https://dummyjson.com/quotes?limit=${
          Math.floor(Math.random() * 4) + 4
        }&skip=${Math.floor(Math.random() * 20)}`
      ).then((res) => res.json())) as { quotes: Quote[] };
      await wait(1000);

      return data;
    },
  });

  useEffect(() => {
    if (!isActive) {
      queryClient.resetQueries({
        queryKey: ['dummydata', true, type],
      });
    }
  }, [isActive, type]);

  return (
    <Accordion.Accordion
      onChange={(value) => setIsActive(value)}
      style={{ gap: _spacing / 2 }}
    >
      <Accordion.Header>
        <View
          style={{
            backgroundColor: 'gold',
            padding: _spacing / 2,
            borderRadius: _spacing / 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#111', flexShrink: 1 }}>{type}</Text>
          <Accordion.HeaderIcon>
            <ChevronUp size={20} color="#333" />
          </Accordion.HeaderIcon>
        </View>
      </Accordion.Header>
      <Accordion.Collapsed>
        <Text style={{ color: 'white', fontSize: 12 }}>
          Hidden when expanded
        </Text>
      </Accordion.Collapsed>
      <Accordion.Always>
        <Text style={{ color: 'white', fontSize: 10 }}>
          Get more details about {type}
        </Text>
      </Accordion.Always>
      <Accordion.Expanded
        style={{
          backgroundColor: '#333',
          width: '100%',
          borderRadius: _spacing / 2,
          padding: _spacing / 2,
        }}
      >
        {isLoading && <ActivityIndicator color={'white'} />}
        {!isLoading && data?.quotes && (
          <View style={{ gap: _spacing / 2 }}>
            {data?.quotes?.map((quote, index) => (
              <Animated.View
                key={quote.id}
                entering={FadeInDown.springify()
                  .damping(80)
                  .stiffness(200)
                  .delay(index * 75)}
              >
                <Text
                  style={{
                    color: '#fff',
                    opacity: 0.7,
                    fontSize: 12,
                    fontFamily: 'Menlo',
                  }}
                >
                  {quote.quote}
                </Text>
                <Text style={{ color: '#fff' }}>{quote.author}</Text>
              </Animated.View>
            ))}
          </View>
        )}
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
