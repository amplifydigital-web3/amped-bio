<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWallet extends Model
{
    use HasFactory;
    protected $table = 'user_wallets';
    protected $fillable = ['user_id', 'wallet_address', 'chain_id', 'updated_by', 'updated_at', 'created_by', 'created_at'];

}
