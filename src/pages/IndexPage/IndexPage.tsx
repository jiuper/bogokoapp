import { Section, List, } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
            А тут пока что разный текст
      </Section>
    </List>
  );
};
