1.	���������� nodeJS � ������������ ����� nodejs.org
2.	������� mongoDB � ������������ ����� mongodb.org � ����� mongodb � ������� �������

����� �������� ������ ����������� ����������� � ���� �������: ��� �������, � ��� ������� ����������.

��������� ����������� ��� ������:
�.	������� � ������������ ����� microsoft � ���������� Windows Server 2003 Resource Kit Tools
�.	��������� InstallAndRunCoAuthoring.bat � ������� ��������������. 
���� ������ ������ ���������:
 - ������������� � ��������� ��� ������, ���� ������ (mongodb).
 - ������������� ���� ������, ������ ������� � ���� coAuthoring � ����������� ��, �������� ��������� �������.
	- db.createCollection("messages").
	- db.messages.ensureIndex({"docid":1}).
	- db.createCollection("changes").
	- db.changes.ensureIndex({"docid":1}).
 - ������������� � ��������� ��� ������ node.js.

 ������ ����������� ����������� ��� ����������:
 �. ��� ������ �������: 
	- ���������������� ��, �������� install_script\ConfigMongoDB.bat
	- ��������� ����������� ���������� ��� node.js, �������� install_script\InstallNodeJSModules.bat
 �. ��������� ������� ���� ������ (mongodb), �������� install_script\StartMongoDb.bat
 �. ��������� node.js ������� install_script\StartServer.bat
 
 ��������� �������� ����������:
  - ������� Python ������ 2.7.3 http://www.python.org/download/releases/2.7.3/#download
  - ��������� InstallNodeJSSpellCheck.bat