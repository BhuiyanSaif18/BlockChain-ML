import os
import json
import xlsxwriter 
import xlrd 



workbook = xlsxwriter.Workbook('Container Resource Logs.xlsx') 
worksheet = workbook.add_worksheet("Logs") 

excelData = {}
f = open("Report.txt", "r")
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
    meminfloat =  float(q[7].split('%')[0])
    if(meminfloat > 95):
        q.append('up')
    elif(meminfloat < 70) :
        q.append('down')
    else :
        q.append('stable')
    excelData[i] = q
    i = i+1

print(excelData)


f.close()