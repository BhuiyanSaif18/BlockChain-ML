#!/bin/bash
while :
do
        #awk 'BEGIN{ OFS="|"; print "Column1|Column2|Column3|Column4|Column5|Column6"}; NR > 1{print "IND", "INR", $6, $7, $8, $9;}' Inputdata.txt > Output.xls
        docker stats --no-stream | grep -e peer0.org1.example.com -e peer0.org2.example.com -e couchdb -e ca_ -e orderer.example.com -e dev-peer0.org2.example.com-fabcar_1-17df8bfcc1de58084bcdd3ea558873db795449edeb19117d8a74a04e9ee5a8f6 -e dev-peer0.org1.example.com-fabcar_1-17df8bfcc1de58084bcdd3ea558873db795449edeb19117d8a74a04e9ee5a8f6|  awk -v date="$(date +'%d/%m/%Y %H:%M:%S')" '{print date, "Name " $2 " CPU " $3 " MEM " $7}' >> Report.txt;

        sleep 7.6 # Delay 30 seconds to execute
done

