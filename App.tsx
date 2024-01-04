import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as  Yup from 'yup' 
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const passwordSchema=Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,'should be at least 4 characters')
  .max(16,'should be at most 16 characters')
  .required('This is a mandatory field')
})


const App = () => {
  const [password,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)



  const generatePasswordString=(passwordLength:number)=>{
      let characterList='';
      const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const lowerCaseChars='abcdefghijklmnopqrstuvwxyz'
      const digitChars='0123456789'
      const specialChars='!@#$%^&*()_+'

      if(upperCase){
        characterList+=upperCaseChars
      }
      if(lowerCase){
        characterList+=lowerCase
      }
      if(numbers){
        characterList+=digitChars
      }
      if(symbols){
        characterList+=specialChars 
      }

      const passwordResult=createPassword(characterList,passwordLength)
      setPassword(passwordResult)
      setIsPassGenerated(true)
    }
  const createPassword=(characters:string,passwordLength:number)=>{
    let result=''
   for(let i=0;i<passwordLength;i++){
    const characterIndex=Math.round(Math.random()*characters.length)
    result+=characters.charAt(characterIndex) 
   }
   return result
  }
  const resetPassword=()=>{
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)


  }
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
    <View style={styles.formContainer}>
    <Text style={styles.title}>Password generator</Text>
    <Formik

       initialValues={{ passwordLength:''}}
 
       validationSchema={passwordSchema}

       onSubmit={values=>{
        console.log(values)
        generatePasswordString(+values.passwordLength)
       }}

     >

       {({

         values,

         errors,

         touched,
         isValid,


         handleChange,


         handleSubmit,

         handleReset,

         /* and other goodies */

       }) => (
<>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text>Password Length :</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}> {errors.passwordLength} </Text>
              )}
       
          </View>
          <TextInput style={styles.inputStyle} value={values.passwordLength} onChangeText={handleChange('passwordLength')}
       placeholder='Enter the length of password to be generated' keyboardType='numeric'
        />
          </View>
        <View style={styles.inputWrapper}> 
        <Text style={styles.title}>Include Lowercase</Text>
        <BouncyCheckbox disableBuiltInState isChecked={lowerCase} fillColor='#29AB87' onPress={()=>{setLowerCase(!lowerCase)}}/>
        </View>
        <View style={styles.inputWrapper}> 
        <Text style={styles.title}>Include Uppercase</Text>
        <BouncyCheckbox disableBuiltInState isChecked={upperCase} fillColor='#DBCC26' onPress={()=>{setUpperCase(!upperCase)}}/>
        </View>
        <View style={styles.inputWrapper}> 
        <Text style={styles.title}>Include Numbers</Text>
        <BouncyCheckbox disableBuiltInState isChecked={numbers} fillColor='#3B39CA' onPress={()=>{setNumbers(!numbers)}}/>
        </View>
        <View style={styles.inputWrapper}> 
        <Text style={styles.title}>Include Symbols</Text>
        <BouncyCheckbox disableBuiltInState isChecked={symbols} fillColor='#AB2929' onPress={()=>{setSymbols(!symbols)}}/>
        </View>
       
        <View style={styles.formActions}>
          <TouchableOpacity disabled={!isValid} style={styles.primarybtn} onPress={()=>handleSubmit()} >
            <Text>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondarybtn} onPress={()=>{
            handleReset() ;
            resetPassword()
          }}>
            <Text>Reset Password</Text>
          </TouchableOpacity>
           </View>


        </>

       )}

     </Formik>
        
        <View>
          {isPassGenerated ? (
            <View>
              <Text style={styles.title}>Result :</Text>
              <Text selectable={true} style={styles.description}>Long press to copy</Text>
              <Text style={styles.generatedPassword}>{password} </Text>
            </View>

):null}
        </View>
     
    </View>
      </SafeAreaView>
    </ScrollView>
    
    )
}

const styles=StyleSheet.create({
title:{
  fontSize:20
},
formContainer:{

},
inputWrapper:{

},
inputColumn:{

},
inputStyle:{

},
formActions:{

},
errorText:{

},
primarybtn:{

},
secondarybtn:{

},
generatedPassword:{

},
description:{

},


}
)

export default App