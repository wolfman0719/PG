ARG IMAGE=containers.intersystems.com/intersystems/iris-community-arm64:2023.1.0.235.1
ARG IMAGE=containers.intersystems.com/intersystems/iris-community-arm64:2023.2.0.221.0
ARG IMAGE=containers.intersystems.com/intersystems/iris-community:2023.1.0.235.1
ARG IMAGE=containers.intersystems.com/intersystems/iris-community:2023.2.0.221.0
FROM $IMAGE

ARG COMMIT_ID="pgdemo"

USER root   
        
ENV ISC_TEMP_DIR=/intersystems/iris/
# WORKDIR /opt/irisapp
# RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /opt/irisap

RUN pip3 install openpyxl
RUN pip3 install pandas

USER ${ISC_PACKAGE_MGRUSER}

ENV ISC_TEMP_DIR=/intersystems/iris/
COPY iris.script /tmp/
COPY utility $ISC_TEMP_DIR/utility
COPY PM $ISC_TEMP_DIR/PM
COPY Form $ISC_TEMP_DIR/Form
COPY solution $ISC_TEMP_DIR/solution
COPY solution/*.xml $ISC_PACKAGE_INSTALLDIR/mgr/user/

RUN iris start IRIS \
	&& iris session IRIS < /tmp/iris.script \
    && iris stop IRIS quietly

USER root

RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} $ISC_TEMP_DIR/
RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} $ISC_TEMP_DIR/solution
RUN mkdir $ISC_TEMP_DIR/UnitTests
RUN mkdir $ISC_TEMP_DIR/UnitTests/JDate
RUN cp $ISC_TEMP_DIR/PM/jdate.xml $ISC_TEMP_DIR/UnitTests/JDate

USER ${ISC_PACKAGE_MGRUSER}
