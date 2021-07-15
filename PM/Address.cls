Class PM.Address Extends (%SerialObject, %Populate, %JSON.Adaptor, Form.Adaptor) [ Inheritance = right ]
{

Parameter FORMNAME = "Address";

Parameter OBJPERMISSIONS As %String = "CRUD";

Parameter DISPLAYPROPERTY As %String = "Zipcode";

Parameter FORMORDERBY As %String = "Zipcode";

/******************************************************************************
Id:  PM.Address.cls#1
説明： 住所（埋め込みオブジェクト）
******************************************************************************/
/// 郵便番号
Property Zipcode As %String(DISPLAYNAME = "Zipcode");

/// 県名
Property Prefecture As %String(DISPLAYNAME = "Prefecture");

/// 都市名
Property City As %String(DISPLAYNAME = "City");

/// 町名番地
Property Street As %String(DISPLAYNAME = "Street");

Method OnPopulate() As %Status
{
	Set id=$R($Get(^PM.YubinDataD))+1
	Set yubin = ##class(PM.YubinData).%OpenId(id)
	Set ..Zipcode=yubin.ZipCode
	Set ..Prefecture=yubin.Ken
	Set ..City=yubin.Toshi
	Set ..Street=yubin.Cyou
	QUIT $$$OK
}

Storage Default
{
<Data name="AddressState">
<Value name="1">
<Value>Zipcode</Value>
</Value>
<Value name="2">
<Value>Prefecture</Value>
</Value>
<Value name="3">
<Value>City</Value>
</Value>
<Value name="4">
<Value>Street</Value>
</Value>
</Data>
<State>AddressState</State>
<StreamLocation>^PM.AddressS</StreamLocation>
<Type>%Storage.Serial</Type>
}

}
