Class PM.ExcelReport
{

ClassMethod activityreport(filename As %String, sheetname As %String) [ Language = python ]
{
	import openpyxl
	from openpyxl import Workbook
	import iris
	import pandas
	
	wb = openpyxl.load_workbook(filename)
	ws = wb[sheetname]
		
	user = iris.sql.exec("SELECT MEMBER->NAME AS NAME,SUM(HOURS) AS TOTALHOURS FROM PM.ACTIVITY WHERE MEMBER->USERNAME = '_system' GROUP BY MEMBER->NAME").dataframe()
	
	for index,row in user.iterrows():
	  ws.cell(row=4, column=2).value = row[0]
	  ws.cell(row=5,column=2).value = row[1]   

	itemline = iris.sql.exec("SELECT YEAR,WEEK,MEMBER->NAME AS NAME,PROJECT->NAME AS PROJECTNAME, PHASE->NAME AS PHASENAME,HOURS FROM PM.ACTIVITY WHERE MEMBER->USERNAME = '_system' order by year,week").dataframe()
	
	linepos = 8
	  
	for index,row in itemline.iterrows():
	  rowline = list(row)
	  ws.cell(row=linepos,column=1).value = rowline[0]
	  ws.cell(row=linepos,column=2).value = rowline[1]
	  ws.cell(row=linepos,column=3).value = rowline[2]
	  ws.cell(row=linepos,column=4).value = rowline[3]
	  ws.cell(row=linepos,column=5).value = rowline[4]
	  linepos = linepos + 1

	wb.save(filename)
	wb.close()
}

}
