///this is also in convert xml. wont run here obvi

const axios = require("axios");

const reqObj = {
  WGBC:{
    states: ["NV"]
  },
  EGBC:{
    states: ['AZ', 'ID', 'UT', 'WY']  
  }
}
const gaccAr = ['WGBC', 'EGBC']
async function requestData(url){
  const data = await axios({
      method: 'post',
      url
    });
  return data.data
}
async function effThis(){
  const arra = []
  const returnObj = {}
  for await(gacc of gaccAr){

    for await( state of reqObj[gacc]['states']){
      // returnObj[gacc][state] = {}
      const data = await requestData(`https://www.wfas.net/nfmd/ajax/groups.php?gacc=${gacc}&state=${state}`)
      // console.log('dtaa', data)
      // console.log('state', state)
      const regex = /|/ig
      const a = data.replace(/\|/g, '-')
      var groupAr = a.split('-')
      for await (group of groupAr){
        // console.log('group', group, group.length)
        const stations = group.length > 0 ? await requestData(`https://www.wfas.net/nfmd/ajax/sites.php?gacc=${gacc}&state=${state}&grup=${group}`) : null
        // console.log('stations', stations)
        const ar = stations ? strToAr(stations) : null
        if(ar){
          // console.log('ar', ar)
          ar.map(curr => {
            returnObj[curr] = makeSiteObj(gacc, state, group)
            console.log('curr', makeSiteObj(gacc, state, group))
          })
        }
        // console.log('ar', ar)
      }
      arra.push(a.split('-'))
    }
  }
  
  console.log('returnObj', JSON.stringify(returnObj))
}

effThis()


function strToAr(str){
  const a = str.replace(/\|/g, '-')
  var groupAr = a.split('-')
  return groupAr
}

const makeSiteObj = (gacc, state, grup, site) => ({gacc, state, grup})

// <a href="http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=EGBC&state=UT&grup=Fillmore%20Field%20Office&site=Black%20Cedar" target="blank">add data</a>
// gacc
// state
// grup
// site