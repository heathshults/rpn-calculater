# RPN Calcu later CLI

Reverse Polish Notation calculator! Why not?  

# installation

In your black box of choice point to index.js in the src directory (for now) and follow the usage steps.

   ``` ./src/index.js ```
    

# usage

give it a shot

```
 $ node  ./src/index.js  5 4 3 2 +
 > 120
```

access the help page like this:

```
 $ node ./src/index.js --help   
```

If you are using terminal in vs code you may not need to type 'node'. Just the path to the file and command.

Should return something like this:

```

      node rpncli [--options] [operands operators]
      
      options   
      	--help  
      	--debug   
      	--fullstack  return full stack    
      
      operands   
      	any number f.ex. 9.99  
      	or in hexadecimal 0x99  
      	or in scientific notation 9e99  
        
      two-operand math operators   
      	'+' '-' '*' '/': arithmetic add, sub, mul, div   
      	'%': modulo   
      	'^' 'p': power   
      	'v': root    
      	  
      single-operand math operators    
      	'f': floor   
      	'r': round   
      	'n': negative, chs, -x   
      	'i': inverse, 1/x    
      	'a': abs  
      	'l': ln  
      	'e': exp  
      	's': sin   
      	'c': cos     
      	't': arcTan   
        
      no-operand operators   
      	'P': pi, π   
      	'E': e   
      	'A': aleatory, random  
         
      stack manipulation    
      	'x': exchange x<->y  
      	'=': duplicate x, enter  
      	'S': store y in x   
      	'R': recall from x   

```

