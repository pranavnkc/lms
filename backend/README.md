Setup project environment with [virtualenv](https://virtualenv.pypa.io) and [pip](https://pip.pypa.io).

```bash
$ virtualenv project-env
$ source project-env/bin/activate
$ pip install -r requirement.txt
$ cd projectname/

$ python manage.py migrate
$ python manage.py createsuperuser #for creating superuser for app login
$ python manage.py runserver
