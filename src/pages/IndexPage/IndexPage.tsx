import {Section, List, Button} from '@telegram-apps/telegram-ui';
import {FC} from 'react';
// interface MasterData {
//     id: string;
//     username: string;
//     post: string;
//     image: string;
// }
//
// interface ValueState {
//     masters: Record<string, MasterData>
//     masters_order: string[];
// }
export const IndexPage: FC = () => {
    // const [value, setValue] = useState<ValueState>
    // ({masters: {master:{id:"", image:"", post:"", username:""} } ,masters_order:[]});
    // useEffect(() => {
    //     fetch('/api/booking/masters?companyId=591511',{
    //         credentials: 'include',
    //         headers: {},
    //     })
    //         .then(response => response.json())
    //         .then(json => setValue(json))
    // }, []);
  return (
    <List>
      <Section
        header='Приложение для салона БОГОКО'
        footer='Тестовое приложение которое будем делать'
      >
          <div>
              {/*{*/}
              {/*    value.masters ? Object.keys(value.masters).map(el =>*/}
              {/*        <div style={{display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px'}} key={el}>*/}
              {/*            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>*/}
              {/*                {el} -*/}
              {/*                <p style={{padding: 0, margin: 0}}>{value.masters[el].username}</p>*/}
              {/*                <p style={{padding: 0, margin: 0}}>{value.masters[el].post}</p>*/}
              {/*                <img src={value.masters[el].image} alt={value.masters[el].username}/>*/}
              {/*            </div>*/}
              {/*        </div>) : 'Загрузка...'*/}
              {/*}*/}
              asd
          </div>

          <Button>Отправить</Button>
      </Section>
    </List>
  );
};
