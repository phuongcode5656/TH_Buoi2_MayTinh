import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { evaluate } from 'mathjs';

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [previousAnswer, setPreviousAnswer] = useState(null);

  const handlePress = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult(null);
  };

  const formatResult = (num) => {
    if (Number.isInteger(num)) {
      return num.toString(); // Nếu là số nguyên, giữ nguyên
    }
    return num.toString().replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, ''); // Loại bỏ số 0 thừa
  };

  const handleFunction = (func) => {
    try {
      let angleInDegrees = parseFloat(expression);
      let angleInRadians = (angleInDegrees * Math.PI) / 180; // Đổi sang radians
  
      let evalResult = 0;
      switch (func) {
        case 'sin':
          evalResult = Math.sin(angleInRadians);
          break;
        case 'cos':
          evalResult = Math.cos(angleInRadians);
          break;
        case 'tan':
          evalResult = Math.tan(angleInRadians);
          break;
        case 'cot':
          evalResult = 1 / Math.tan(angleInRadians);
          break;
        default:
          break;
      }
  
      // Làm tròn kết quả đến 4 chữ số thập phân
      evalResult = parseFloat(evalResult.toFixed(4));
      
      // Cập nhật màn hình hiển thị kết quả
      setResult(formatResult(evalResult)); // Sử dụng hàm formatResult để định dạng kết quả
      setPreviousAnswer(evalResult); // Lưu đáp án trước đó
      setExpression(''); // Xóa biểu thức sau khi tính toán
    } catch (error) {
      setResult('Error'); // Hiển thị lỗi nếu có vấn đề
    }
  };
  

  const handleEvaluate = () => {
    try {
      // Thay thế dấu ^ bằng ** để thực hiện phép lũy thừa trong JavaScript
      let evalExpression = expression.replace(/\^/g, '**'); 
      
      let evalResult = evaluate(evalExpression);
  
      // Làm tròn kết quả đến 4 chữ số thập phân hoặc hiển thị số nguyên nếu cần
      evalResult = parseFloat(evalResult.toFixed(4));
  
      setResult(formatResult(evalResult)); // Sử dụng hàm formatResult để định dạng kết quả
      setPreviousAnswer(evalResult); // Lưu đáp án trước đó
      setExpression(''); // Xóa biểu thức sau khi tính toán
    } catch (error) {
      setResult('Error'); // Hiển thị lỗi nếu có vấn đề
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{expression || result || "0"}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleClear} style={styles.button}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('(')} style={styles.button}><Text>(</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(')')} style={styles.button}><Text>)</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('/')} style={styles.button}><Text>/</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('7')} style={styles.button}><Text>7</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('8')} style={styles.button}><Text>8</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('9')} style={styles.button}><Text>9</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('*')} style={styles.button}><Text>*</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('4')} style={styles.button}><Text>4</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('5')} style={styles.button}><Text>5</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('6')} style={styles.button}><Text>6</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('-')} style={styles.button}><Text>-</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('1')} style={styles.button}><Text>1</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('2')} style={styles.button}><Text>2</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('3')} style={styles.button}><Text>3</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('+')} style={styles.button}><Text>+</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('0')} style={styles.button}><Text>0</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('.')} style={styles.button}><Text>.</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('^')} style={styles.button}><Text>^</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleEvaluate} style={styles.button}><Text>=</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleFunction('sin')} style={styles.button}><Text>sin</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleFunction('cos')} style={styles.button}><Text>cos</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleFunction('tan')} style={styles.button}><Text>tan</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleFunction('cot')} style={styles.button}><Text>cot</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setExpression(previousAnswer)} style={styles.button}><Text>Ans</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  display: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'right',
    paddingRight: 20,
    width: '90%',
    backgroundColor: '#d1d1d1',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default App;
