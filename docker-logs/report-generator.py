import os
import json
import xlsxwriter 
import xlrd 



workbook = xlsxwriter.Workbook('Container Resource Logs 23_09_2021_2.xlsx') 
worksheet = workbook.add_worksheet("Logs") 

excelData = {}
f = open("Report_23_09_2021_2.txt", "r")
p = f.readline()
# q = p.split(' ')
# q.append('label')
# q[7] = q[7].split('\n')[0]
# meminfloat =  float(q[7].split('%')[0])
# if(meminfloat > 95):
#     q.append('up')
# elif(meminfloat < 70) :
#     q.append('down')
# else :
#     q.append('stable')


# print(q)
i = 0
for x in f:

    q = x.split(' ')
    q.append('label')
    q[7] = q[7].split('\n')[0]
    
    cpuinfloat =  float(q[5].split('%')[0])
    if(cpuinfloat > 75):
        q.append('up')
    elif(cpuinfloat < 50) :
        q.append('down')
    else :
        q.append('stable')

    meminfloat =  float(q[7].split('%')[0])
    if(meminfloat > 95):
        q.append('up')
    elif(meminfloat < 70) :
        q.append('down')
    else :
        q.append('stable')

    # excelData = q
    # print(i)
    excelData[i] = q
    i = i+1

# print(excelData)


f.close()


row = 0
col = 0
  
# Iterate over the data and write it out row by row. 
for key in (excelData): 
    # print(excelData[key])
    worksheet.write(key, col, excelData[key][1]) 
    worksheet.write(key,col+1, excelData[key][3])
    worksheet.write(key,col+2, excelData[key][5].split("%")[0])
    worksheet.write(key,col+3, excelData[key][24])
    worksheet.write(key,col+4, excelData[key][7].split("%")[0]) 
    worksheet.write(key,col+5, excelData[key][25]) 
    # worksheet.write(key, excelData[key][0]) 
    row += 1
  
workbook.close() 