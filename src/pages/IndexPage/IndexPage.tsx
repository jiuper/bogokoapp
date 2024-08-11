import {Section, List, Button} from '@telegram-apps/telegram-ui';
import {FC, useEffect, useState} from 'react';

export const IndexPage: FC = () => {
    const [value, setValue] = useState<{masters: { string:  {id: string, username: string, post: string, image: string}},masters_order: string[]}>
    ({masters:{string:{id:"", image:"", post:"", username:""}},masters_order:[]});
    useEffect(() => {
        fetch('/api/booking/masters?companyId=591511',{
            credentials: 'include',
            headers: {},
        })
            .then(response => response.json())
            .then(json => setValue(json))
    }, []);
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
          <div>
              {
                  value.masters && Object.keys(value.masters).map(el =>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px'}} key={el}>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                              {el} -
                              <p style={{padding: 0, margin: 0}}>{value.masters[el].username}</p>
                              <p style={{padding: 0, margin: 0}}>{value.masters[el].post}</p>
                              <img src={value.masters[el].image} alt={value.masters[el].username}/>
                          </div>

                      </div>)
              }
          </div>
          <Button>Отправить</Button>
      </Section>
    </List>
  );
};
