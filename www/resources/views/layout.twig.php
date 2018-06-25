<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		
		{% block seo %}{% endblock %}

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<link rel="stylesheet" type="text/css" href="{{ base_url() }}/assets/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="{{ base_url() }}/assets/css/css.bs3.en.css" />

	</head>

<body style="background:#f5f5f5;" >

<div class="container">
	<div class="row">
		<div class="col-xs-12">
			{% block content %}{% endblock %}
		</div>
	</div>
	
	<div class="row">
		<div class="col-xs-12">
			{% block footer %}
				&copy; Copyright {{ "now"|date('d m Y H:i', timezone="Asia/Bangkok") }} by <a href="http://domain.invalid/">you</a>.
			{% endblock %}
		</div>
	
	</div>
</div>

    </body>
</html>