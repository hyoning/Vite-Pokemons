import React,{ useEffect, useState } from 'react'
import Type from '../components/Type'

const DamageRelations = ({damages}) => {

  const [damagePokemonForm, setDamagePokemonForm] = useState()

  useEffect(() => {
   const arrayDamage = damages.map((damage) => 
    separateObjectBetweenToAndFrom(damage))


    if(arrayDamage.length === 2){
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamagevalue(obj.from)));
    } else{
      setDamagePokemonForm(postDamagevalue(arrayDamage[0].from));
    }
  }, [])
  
  // 능력이 2개이상 일때 to, from 속성 불러오기
  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, 'to'),
      from: joinObjects(props, 'from')
    }
  }

  // 능력이 2개이상 일 때, 데미지가 같은 것이 있을 때 합쳐서 값 바꿔주기
  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: '4x',
      half_damage: '1/4x',
      no_damage: '0px'
    }
    return Object.entries(props)
          .reduce((acc, [keyName, value]) => {
            const key = keyName;
            const varifiedValue = filterForUniqueValues(
              value,
              duplicateValues[key]
            )
            return (acc = {[keyName] : varifiedValue, ...acc});
          },{})
  }
  const filterForUniqueValues = (valueForFiltering, damageValue) => {

    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      
      const filterACC = acc.filter((a) => a.name !== name);

      return filterACC.length === acc.length
      ? (acc = [currentValue, ...acc])
      : (acc = [{damageValue:damageValue, name, url}, ...filterACC])
    }, [])
    
  }

  //능력 2개이상일때 각각의 데미지를 1개로 합쳐주기 
  const joinObjects = (props, string) => { 
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];

   const result = Object.entries(secondArrayValue)
          .reduce((acc, [keyName, value])=> {

            // 합치기
            const result = firstArrayValue[keyName].concat(value);
            return (acc = {[keyName]: result, ...acc})
          }, {})

    return result;
  }


  // 능력이 1개 일때 from 속성 불러오기
  const postDamagevalue = (props) => {
   const result = Object.entries(props)
          .reduce((acc, [keyName, value])=> {

            const key = keyName;
            const valuesOfKeyName = {
              double_damage : '2x',
              half_damage: '1/2x',
              no_damage: '0x'
            }
           
            return (acc = {[keyName] : value.map(i => ({
                damageValue : valuesOfKeyName[key],
                ...i
              })),
              ...acc
            })
          },{})
    return result;
  }


  // from, to 데미지 나누기
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations('_from', damage);
    const to = filterDamageRelations('_to', damage);
    return {from, to}
  }

  // valuefilter 속성 뒤에 from, to 값 없애기
  const filterDamageRelations = (valueFilter, damage) =>{
    const result = Object.entries(damage)
    .filter(([keyName, value]) => {
      return keyName.includes(valueFilter);
    })
    .reduce((acc, [keyName, value]) => {

      const keyWithValueFilterRomove = keyName.replace(
        valueFilter,
        ''
      )
      return (acc = {[keyWithValueFilterRomove]:value, ...acc})
    },{})

    return result;
  }

  return (
    <div className='flex gap-2 flex-col'>
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm)
            .map(([keyName, value]) => {
                const key = keyName;
                const valuesOfKeyName = {
                  double_damage: 'Weak',
                  half_damage: 'Resistant',
                  no_damage: 'Immune'
                }
                return(
                 <div key={key}>
                   <h3 className='capitalize font-medium text-sm md:text-base text-slate-500 text-center'>
                    {valuesOfKeyName[key]}
                   </h3>
                   <div className='flex flex-wrap gap-1 justify-center'>
                    {value.length > 0 ? (
                      value.map(({name, url, damageValue}) => {
                        return(
                          <Type 
                            type={name}
                            key={url}
                            damageValue={damageValue}
                          />
                        )})
                      ) : (
                        <Type type={'none'} key={'none'} />
                      )}
                   </div>
                 </div> 
                )
            })}
        </>
      ): <div></div>
    }
    </div>
  )
}

export default DamageRelations