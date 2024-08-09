import {Section, List, Text, Button, Image} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import IMG from "../../shared/assets/images/photo_2023-08-17_18-11-08.jpg"
export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
          <Image src={IMG}/>
            <Text>asd</Text>
          <Button>Отправить</Button>
      </Section>
    </List>
  );
};
