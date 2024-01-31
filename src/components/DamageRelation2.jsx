import React,{ useEffect } from 'react'



const DamageRelations = ({damages}) => {

 useEffect(() => {
    const arrayDamage = damages.map((damage) => 
     searateObjectBetweenToAndFrom(damage))

     if(arrayDamage.length ===2){
      
     } else{
      postDamageValue(arrayDamage[0].from)
     }
 },[])

const postDamageValue = (props) =>{
  Object.entries(props)
        .reduce((acc, [keyName, valueName]) => {
          consolog.log(acc, [keyName, valueName]);
        },{})
}

const searateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations('_from', damage);
    const to = filterDamageRelations('_to'. damage);

    return {from, to};
}

const filterDamageRelations = (valueFilter, damage) => {
     const result = Object.entries(damage)
    .filter(([keyName, value]) => {
      return keyName.includes(valueFilter);
    })
    .reduce((acc, [keyName, value]) => {
      const keyWithValueFilterRemove = keyName.replace(valueFilter, '');
      return { ...acc, [keyWithValueFilterRemove]: value };
    }, {});
    return result;
  };
  return (
    <div>DamageRelations</div>
  )
}

export default DamageRelations