��������� ������� ����������

��������, ���������� ��������� �������������� ������� ���������� �� Windows-���������.

0. ���������� ���� IIS ���� �� 8001 �����(�������� ������ �� ���� �����������)

1. ��������� ����������� �����������

��� ������ ������� ���������� ���������� ���������� � ������� ��������� ���������� (���� �� ������� �������������, ����� ������� ��������� ���������� ������, ����� �����������, � ���������� �����������):
	�) 32-� ��������� ������ Node.js 4.0.x (https://nodejs.org/dist/v4.0.0/node-v4.0.0-x86.msi) 
		��� ��������� ������������ ������ Node.js ��������� 'node -v' 
		32-� ��������� ������ ��������� ������ ��� ������ �������� ����������, ���� �� ����������� ������������ ���� ������ ����� ������������ 64-� ��������� ������.
	�) MySql Server 5.6 � ���� (http://dev.mysql.com/downloads/windows/installer/) ��� ��������� ��� ������������ root ����������� ������ onlyoffice
	�) Erlang (http://www.erlang.org/download.html)
	�) RabbitMQ (https://www.rabbitmq.com/releases/rabbitmq-server/v3.5.4/rabbitmq-server-3.5.4.exe)
	�) Redis (https://github.com/MSOpenTech/redis/releases/download/win-2.8.2102/Redis-x64-2.8.2102.msi)
	�) Python 2.7.x (http://www.python.org/download/releases/2.7.3/#download)
	�) Microsoft Visual C++ Express 2010 (?) (��������� ��� ������ ������� ��� Spellchecker)

2. ��������� �������

	�) ��������� ��
	��������� ������ � mysql svn://fileserver/activex/AVS/Sources/TeamlabOffice/trunk/AsyncServerComponents/FileConverterUtils2/FileConverterUtils2/schema/MySql.CreateDb.sql
	
	�) ��������� npm �������.
	��������� ������ install_npm_modules.bat
	
	�) ��������� Web Monitor ��� RabbitMQ �����������(https://www.rabbitmq.com/management.html)
	����������� cmd. ��������� � ����� (cd /d Installation-directory/sbin)
	��������(rabbitmq-plugins.bat enable rabbitmq_management)
	Web Monitor ������������� �� ������(http://localhost:15672/). �����/������(guest/guest)

	�) ���� �� �����-�� ������� � ��� �� �������� Redis, ���� �� �������� � ����� �����-�� ����� ������, ���������� � ���������� ������� ��������� ������ ��������� maxheap. ��� WIN7 x64 ���� ������� ����� ���: C:\Program Files\Redis\redis.windows-service.conf. � ����� ���� ������
	# maxheap <bytes>
	� ������ ��, ��������, ��  
	maxheap 128MB. 
	������������� ������.
	
	�) ������� ����� App_Data � ����� nodeJSProjects.

	�) ���� ����� � ���� ���������� �� office ��� ����� �� �� ����� ������ � OfficeWeb. �� ����� ������� ��������� ���� ������� nodeJSProjects\Common\config\local.json(��� svn �������� �� �����)
	� ����������(� ��������� static_content.path ������� ���� � ����)
{
  "services": {
    "CoAuthoring": {
      "server": {
        "static_content": [
          {
            "name": "/OfficeWeb",
            "path": "../../../OfficeWeb"
          },
          {
            "name": "/office",
            "path": "../../../office"
          }
        ]
      }
    }
  }
}

3. ������ �������

��������� ������ run_services.bat

���������

	�) ��� ������� ��� ��������� ����� ��������� � ����� nodeJSProjects\Common\config
		 - default.json  ����� ������� ���������� ��� ���� ������ ����������.
		 - production-windows.json ������� ��� ������� ���������-������ �� windows ���������
		 - production-linux.json ������� ��� ������� ���������-������ �� linux ���������
		 - development-windows.json ������� ��� ������� �������������-������ �� windows ��������� (��� ������������ ������������ ��� ������� run_services.bat)

	��� ������������� ������ ��������� ��������� � ������� �������� ���� local.json � �������������� �������� ���. ���� ��������� ��� svn �� ����. ��� �������� �������� �� ������ ��������� ������ � �������� ������ ������� ��� ���������� svn. ������ ������������� ������ � ������ 2-�. �������� � ������ ������������ ��. https://github.com/lorenwest/node-config/wiki/Configuration-Fileshttps://github.com/lorenwest/node-config/wiki/Configuration-Files

4. ��������.
	����� ���������� �����������, ��� � ������ ������� ����������� ���������� ������� ���� � ��������� (���� ���� �� ������, �� ���� �������� �������� ��������� �� �������� ����� � ������ 'licence.lic'):
{
  "services": {
    "CoAuthoring": {
      "server": {
        "license_file_path": "<����_�_�����_��������"
      }
    }
  }
}
���������� ������ �������� �����: http://buildserver/view/ClosedSource/job/LicenseCreator/lastSuccessfulBuild/artifact/license.lic
����� � ������ ����� ��, ��� ��� ������ � �������.