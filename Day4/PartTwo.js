fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const valid = {
    byr: (num) => {
        return Number(num) >= 1920 && Number(num) <= 2002
    },
    iyr: (num) => {
        return Number(num) >= 2010 && Number(num) <= 2020
    },
    eyr: (num) => {
        return Number(num) >= 2020 && Number(num) <= 2030
    },
    hgt: (str) => {
        return str.endsWith('cm') ?
        Number(str.replace(/cm/g, '')) >= 150 && Number(str.replace(/cm/g, '')) <= 193 : 
        str.endsWith('in') && (Number(str.replace(/in/g, '')) >= 59 && Number(str.replace(/in/g, '')) <= 76)
    },
    hcl: (str) => {
        try{
        return Boolean(str.match(/#[0-9a-f]{6}/i)[0] == str)
        } catch {
            return false;
        }
    },
    ecl: (str) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str)
    },
    pid: (str) =>{
        return Boolean(str.match(/[0-9]{9}/));
    },
    cid: (x) => {return true;}
}

const reqFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
const optFields = ['cid'];

const passports = data.split('\n\n');

// console.log(passports);

let bad = 0;
for(let xi in passports){
    // xi = 3
    let x = passports[xi]
    let fields = [];
    let passportFields = {}
    x.replace(/\n/g, ' ').split(' ').forEach(y => {
        // let temp = {
        //     // key: y.split(':')[0],
        //     // val: y.split(':')[1]
        // };
        passportFields[y.split(':')[0]] = y.split(':')[1];
        // fields.push(temp);
    })
    // let fieldKeys = fields.map(x => {return x.key});
    let fieldKeys = Object.keys(passportFields);

    let out = 0;
    for(let reqField of reqFields){

        let val;
        if(fieldKeys.includes(reqField)){
            val = passportFields[reqField];
        }
        if(!(val && valid[reqField](val))){
            bad++;
            break
        }







        // let field = fields[fieldKeys.indexOf(reqfield)];
        // console.log(valid[field.key](field.val), field)
        // out *= valid[field.key](field.val)
        // if(fieldKeys.includes(reqfield)){
        //     val = fields[fieldKeys.indexOf(reqfield)].value;
        // }else{
        //     out = 0;
        // }


    }
    // console.log('- ' + Boolean(out))
// break;
    // if(out){
    //     count ++;

    // }






    // for(let i = 0; i < fields.length; ++i){
        // let hasKey = fieldKeys.includes(neededFields[j]);
        // if(hasKey){
        //     let field = fields[fieldKeys.indexOf(neededFields[j])];
        //     console.log(neededFields[j])
        
        //     console.log(valid[field.key](field.val), field.key, field.val)
        //     out *= valid[field.key](field.val)
        // }else{
        //     out = false;
        // }
        // };

// break;
}

console.log(passports.length - bad);
