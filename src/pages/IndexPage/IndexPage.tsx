import {Section, List, Button} from '@telegram-apps/telegram-ui';
import {FC, useEffect, useState} from 'react';

export const IndexPage: FC = () => {
    const [value, setValue] = useState([]);
    useEffect(() => {
        fetch('https://dikidi-booking-api.onrender.com/api/booking/masters?companyId=591511')
            .then(response => response.json())
            .then(json => setValue(json))
    }, []);
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
        <ul>
            {
                value.map(el => <li key={el}>{el}</li>)
            }
        </ul>
          <Button>Отправить</Button>
      </Section>
    </List>
  );
};
