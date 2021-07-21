<?php

header('Content-Type: text/html; charset=UTF-8');
mb_internal_encoding('UTF-8');

session_start();

if (!isset($_SESSION['fontSize'])) {
	$_SESSION['fontSize'] = 42;
}

if (!isset($_SESSION['matrixFont'])) {
	$_SESSION['matrixFont'] = false;
}

if (isset($_GET['set'])) {
	switch ($_GET['set']) {
		case 'characters': {
			$characters = validateCharacters($_GET['characters']);
			$_SESSION['characters'] = $characters;
			break;
		}

		case 'fontSize': {
			$fontSize = validateFontSize($_GET['fontSize']);
			$_SESSION['fontSize'] = $fontSize;
			break;
		}

		case 'matrixFont': {
			$_SESSION['matrixFont'] = ($_GET['matrixFont'] === 'true');
		}
	}
}

if (isset($_GET['get'])) {
	switch ($_GET['get']) {
		case 'characters': {
			echo json_encode($_SESSION['characters']);
			break;
		}

		case 'fontSize': {
			echo json_encode($_SESSION['fontSize']);
			break;
		}

		case 'matrixFont': {
			echo json_encode($_SESSION['matrixFont']);
		}

		default: {
			$data = array(
				'characters' => $_SESSION['characters'],
				'fontSize' => $_SESSION['fontSize'],
				'matrixFont' => $_SESSION['matrixFont']
			);

			echo json_encode($data);
		}
	}
}

function validateCharacters($characters) {
	$characters = mb_strtoupper($characters);
	$characters = str_replace("Ё", "Е", $characters);
	$characters = preg_replace("/[^A-ZА-Я0-9]/", "", $characters);

	return $characters;
}

function validateFontSize($size) {
	$size = preg_replace("/[^0-9]/", "", $size);
	$size = str_replace(" ", "", $size);
	$size = min(max(+$size, 5), 50);

	return $size;
}