import {Section, List, Button} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
asd
          <Button>Отправить</Button>
      </Section>
    </List>
  );
};
